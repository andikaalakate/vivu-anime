import axios from 'axios'

// Fungsi untuk mendapatkan anime response dari API
export const getAnimeResponse = async (resource, query) => {
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/${resource}?${query}`)
  return response.data
}

// Fungsi untuk mendapatkan properti nested dari anime response
export const getNestedAnimeResponse = async (resource, objectProperty) => {
  const response = await getAnimeResponse(resource)
  return response.data.map((item) => item[objectProperty]).flat()
}

// Fungsi untuk memproduksi subset dari data dengan gap tertentu
export const reproduce = (data, gap) => {
  const first = Math.floor(Math.random() * (data.length - gap) + 1)
  const last = first + gap

  return {
    data: data.slice(first, last)
  }
}
