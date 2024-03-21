export const mappers = async(info: any) =>{
    const mapper = await Promise.all(
        info.map((i: any) => {
          let address = ""
          if (i.districtId) address = i.village + "," + i.districtId.name + ', ' + i.districtId.provinceId.name
          return {
            _id: i._id,
            name: i.name,
            email: i.email,
            mobile: i.mobile,
            status: i.status,
            village: i.village,
            districtId: i.districtId,
            address,
            createAt: i.createdAt
          }
        })
      )
}