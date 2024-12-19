export interface UserInterface {
  id: string
  email: string
  name: string
  phone: string
  address_user: {
    country: string
    iso_country_code: string
  }
  contracts: [
    {
      product_name: string
      price: string
      contract_period_start_date: string
      contract_period_end_date: string
      status: string
      resource: {
        product_name: string
        product_code: string
        description: string
        languages: [
          {
            language: string
            iso_country_code: string
            link: string
            img_resource: string
          },
        ]
      }
    },
  ]
}
