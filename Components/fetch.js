export async function weatherreport(lat,lng){
    const dataa=await fetch( `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,sunrise,sunset,windspeed_10m_max&timezone=auto&current_weather=true`)
    const res=await dataa.json()

    return res
}

export async function City(lat,lng){
    const dataa=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
    const res=await dataa.json()
    return res.address.city || res.address.village || res.address.town ||res.address.state ||res.address.country
}

export async function Searchingcity(cityname){
    if(!cityname)return
   const dataa=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityname}&count=1&language=en&format=json`) 
   const res=await dataa.json() 
   console.log(res)
   return res
}
