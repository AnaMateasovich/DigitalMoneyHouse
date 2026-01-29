const companies = [
    {
        id: 1,
        name: 'EPE',
        category: 'Electricidad',
        date: '2025-11-18',
        invoice_value: '15000',
        src: '/epe.webp',
        description: 'Empresa Provincial de la Energía'
    },
    {
        id: 2,
        name: 'ASSA',
        category: 'Agua',
        date: '2025-11-18',
        invoice_value: '8500',
        src: '/assa.svg',
        description: 'Aguas Santafesinas S.A.'
    },
    {
        id: 3,
        name: 'Litoral Gas',
        category: 'Gas',
        date: '2025-11-18',
        invoice_value: '12000',
        src: '/litoral-gas.jpg',
        description: 'Distribuidora de Gas del Litoral'
    },
    {
        id: 4,
        name: 'Telecom',
        category: 'Internet',
        date: '2025-11-18',
        invoice_value: '9800',
        src: '/telecom.jpg',
        description: 'Servicios de Internet y Telefonía'
    },
    {
        id: 5,
        name: 'Claro',
        category: 'Internet',
        date: '2025-11-18',
        invoice_value: '7500',
        src: '/claro.jpg',
        description: 'Servicios de Internet Móvil'
    }
]

export const serviceBill = [
  {
    id: 1,
    accountNumber: "37289701912",
    name: "EPE",
    amount: 15400
  },
  {
    id: 2,
    accountNumber: "39871234999",
    name: "Litoral Gas",
    amount: 22000
  },
  {
    id: 3,
    accountNumber: "55220011990",
    name: "Telecom",
    amount: 2000
  },
   {
    id: 4,
    accountNumber: "5121021930",
    name: "Claro",
    amount: 150
  }
]

export default companies