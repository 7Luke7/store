import { FetchError } from "../lib/exceptions"

export const requestElectronicsData = async (filters: any) => {
    try {
        const { brand, page, sort} = filters
        const res = await fetch(`${process.env.URL}/products/electronics?page=${page}&brand=${brand || ""}&sort=${sort}`, {
            cache: "no-cache"
        })
        const data = await res.json()
        return data
    } catch (error) {
        throw new FetchError()
    }
}  

export const requestHomeFurnitureData = async (filters: any) => {
    try {        
        const { brand, page, sort} = filters
        const res = await fetch(`${process.env.URL}/products/homefurniture?page=${page}&brand=${brand || ""}&sort=${sort}`, {
            cache: "no-cache"
        })
        const data = await res.json()
        return data
    } catch (error) {
        throw new FetchError()
    }
}  

export const requestClothingFashionData = async (filters: any) => {
    try {
        const { brand, page, sort} = filters
        const res = await fetch(`${process.env.URL}/products/clothingfashion?page=${page}&brand=${brand || ""}&sort=${sort}`, {
            cache: "no-cache"
        })
        const data = await res.json()
        return data
    } catch (error) {
        throw new FetchError()
    }
}  

export const requestSingleProduct = async (id: any) => {
    try {
        const res = await fetch(`${process.env.URL}/product/${id}`, {
            cache: "no-cache"
        })
        const data = await res.json()
        return data
    } catch (error) {
        throw new FetchError()
    }
}

export const requestProductsByCategory = async ({brand, page, sort, category}: any) => {
    try {
        const res = await fetch(`${process.env.URL}/products/category/${category}?page=${page}&brand=${brand || ""}&sort=${sort}`, {
            cache: "no-cache"
        })
        const data = await res.json()
        return data
    } catch (error) {
        throw new FetchError()
    }
}

export const request_home_furniture_data_landing = async () => {
    try {
        const res = await fetch(`${process.env.URL}/products/landing/home`, {
            cache: "no-cache"
        })
        const data = await res.json()
        return data
    } catch (error) {
        throw new FetchError()
    }
}

export const request_electronic_data_landing = async () => {
    try {
        const res = await fetch(`${process.env.URL}/products/landing/electronic`, {
            cache: "no-cache"
    })
        const data = await res.json()
        return data
    } catch (error) {
        throw new FetchError()
    }
}

export const request_clothin_fashion_data_landing = async () => {
    try {
        const res = await fetch(`${process.env.URL}/products/landing/clothing`, {
            cache: "no-cache"
       })
        const data = await res.json()
        return data
    } catch (error) {
        throw new FetchError()
    }
}

export const add_new_cart_product = async (data: any) => {
    try {
        const res = await fetch(`${process.env.URL}/products/cart`,
         {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            next: {tags: ["cartproducts"]}

        })
        return res
    } catch (error) {
        throw new FetchError()
    }
}

export const get_cart_products = async (queryPage: any) => {
    try {
        const res = await fetch(`${process.env.URL}/products/cart?page=${queryPage}`, {
            cache: "no-cache",
            next: {tags: ["cartproducts"]}
        })
        const data = await res.json()
        return data
    } catch (error) {
        throw new FetchError()
    }
}

export const clear_cart_products = async () => {
    try {
        const res = await fetch(`${process.env.URL}/products/cart`, {
            method: "DELETE",
            next: {tags: ["cartproducts"]}
        })
        return res
    } catch (error) {
        throw new FetchError()
    }
}

export const delete_cart_product = async (id: any) => {
    try {
        const res = await fetch(`${process.env.URL}/products/cart/${id}`, {
            method: "DELETE",
            next: {tags: ["cartproducts"]}
        })
        return res
    } catch (error) {
        throw new FetchError()
    }
}