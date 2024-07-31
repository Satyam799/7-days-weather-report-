import { useEffect, useState } from "react"
import { Text } from "react-native"

function Clock(){
    const [timee,settime]=useState(new Date())


    useEffect(function(){
        const interval=setInterval(()=>{
            settime(new Date())

        },1000)
        return ()=>{
            clearInterval(interval)
        }
    },[])



    const time=`${timee.getHours().toString().padStart(2,0)}:${timee.getMinutes().toString().padStart(2,0)}:${timee.getSeconds().toString().padStart(2,0)}`
    return  <Text style={{fontFamily:'Avata-font',fontSize:20,color:'white'}}>{time}</Text>
}

export default Clock