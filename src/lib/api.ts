import { cache } from "react";

const API_BASE = "https://cms.furnishings.daikimedia.com/api";

async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        console.error(`API error (attempt ${i + 1}/${retries}):`, res.status);
        if (i === retries - 1) return null;
        continue;
      }

      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error(
          `Non-JSON response (attempt ${i + 1}/${retries}):`,
          text.substring(0, 200)
        );
        if (i === retries - 1) return null;
        continue;
      }

      return res;
    } catch (error) {
      console.error(`Fetch attempt ${i + 1}/${retries} failed:`, error);

      if (i === retries - 1) throw error;

      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }

  return null;
}


export const getProducts = cache(async () => {
  try {
    const res = await fetchWithRetry(`${API_BASE}/products`, {
      next: { revalidate: 1800 },
    });

    if (!res) return [];

    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
});

export const getProductBySlug = cache(async (slug: string) => {
  try {
    const res = await fetchWithRetry(`${API_BASE}/products?slug=${slug}`, {
      next: { revalidate: 1800 },
    });

    if (res) {
      const data = await res.json();
      if (data.success && data.data?.length) {
        return data.data[0];
      }
    }

    // fallback
    const products = await getProducts();
    const normalizedSlug = slug.toLowerCase().trim();

    return (
      products.find(
        (p: any) => p.slug?.toLowerCase().trim() === normalizedSlug
      ) || null
    );
  } catch (error) {
    console.error("Failed to fetch product by slug:", error);
    return null;
  }
});


export const getCategories = cache(async () => {
  try {
    const res = await fetchWithRetry(`${API_BASE}/categories`, {
      next: { revalidate: 3600 },
    });

    if (!res) return [];

    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
});


export const getBlogs = cache(async () => {
  try {
    const res = await fetchWithRetry(`${API_BASE}/blogs/all-blogs`, {
      next: { revalidate: 1800 },
    });

    if (!res) {
      return {
        success: false,
        data: [],
        meta: { currentPage: 1, totalPages: 0, totalItems: 0 },
      };
    }

    const data = await res.json();

    if (Array.isArray(data)) {
      return {
        success: true,
        data,
        meta: {
          currentPage: 1,
          totalPages: 1,
          totalItems: data.length,
        },
      };
    }

    if (data?.data && Array.isArray(data.data)) {
      return {
        success: true,
        data: data.data,
        meta: data.meta || {
          currentPage: 1,
          totalPages: 1,
          totalItems: data.data.length,
        },
      };
    }

    return {
      success: true,
      data: [],
      meta: { currentPage: 1, totalPages: 0, totalItems: 0 },
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);

    return {
      success: false,
      data: [],
      meta: { currentPage: 1, totalPages: 0, totalItems: 0 },
    };
  }
});


export const getBlogBySlug = cache(async (slug: string) => {
  try {
    const res = await fetchWithRetry(`${API_BASE}/blogs/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!res) return null;

    return res.json();
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
});