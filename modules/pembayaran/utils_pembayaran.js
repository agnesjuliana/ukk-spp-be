const unpaidMonth = (param, data) => {
  const listBulan = [
    { id: 7, tahun: param.tahun_spp[0], paid: false },
    { id: 8, tahun: param.tahun_spp[0], paid: false },
    { id: 9, tahun: param.tahun_spp[0], paid: false },
    { id: 10, tahun: param.tahun_spp[0], paid: false },
    { id: 11, tahun: param.tahun_spp[0], paid: false },
    { id: 12, tahun: param.tahun_spp[0], paid: false },
    { id: 1, tahun: param.tahun_spp[1], paid: false },
    { id: 2, tahun: param.tahun_spp[1], paid: false },
    { id: 3, tahun: param.tahun_spp[1], paid: false },
    { id: 4, tahun: param.tahun_spp[1], paid: false },
    { id: 5, tahun: param.tahun_spp[1], paid: false },
    { id: 6, tahun: param.tahun_spp[1], paid: false },
  ]

  data.map((item) => {
    const data = {
      id: item.bulan_spp,
      tahun: item.tahun_spp
    }
    
    if (data.id <= 6 && data.tahun == param.tahun_spp[1]) {
      listBulan[data.id + 5].paid = true
    }

    if (data.id > 6 && data.tahun == param.tahun_spp[0]) {
      listBulan[data.id - 7].paid = true
    }
  })


  listBulan.map((item) => {
    if (item.paid) {
      let i = listBulan.map(function (item) { return item; }).indexOf(item)
      listBulan.splice(i, 1);
    }
  })

  return listBulan
}

module.exports = {unpaidMonth}