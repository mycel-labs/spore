const url = import.meta.env.VITE_BINARY_URL!

export async function fetchAllRecords(name: string, parent: string) {
  const response = await fetch(
    `${url}/resolver/all_records/${name}/${parent}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const data = await response.json()
  return data?.values
}
