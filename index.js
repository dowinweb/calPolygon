// 这里是多边形的顶点 不规则 无顺序
const list = [
	{"latitude":39.919143,"longitude":116.462399},
  {"latitude":39.916509,"longitude":116.465178},
  {"latitude":39.913726,"longitude":116.464296}
 ]

// 调用这个方法即可， 会改变原数组 list
function dealList(list) {
  const result = list.reduce((prev, next) => {
  return {
    longitude: +prev.longitude + +next.longitude,
    latitude: +prev.latitude + +next.latitude
  }
  },{
    longitude: '',
    latitude: ''
  })
  const center = {
    longitude: result.longitude / list.length,
    latitude: result.latitude / list.length
  }

  function getAngle(lat_a,  lng_a,  lat_b,  lng_b) {
    const y = Math.sin(lng_b - lng_a) * Math.cos(lat_b);
    const x = Math.cos(lat_a) * Math.sin(lat_b) - Math.sin(lat_a) * Math.cos(lat_b) * Math.cos(lng_b - lng_a);
    let brng = Math.atan2(y, x);
    brng = radians_to_degrees(brng);
    if (brng < 0) {
      brng = brng + 360;
    }
    return brng;
  }
  list.forEach(item => {
    item.angle = +getAngle(center.latitude, center.longitude, item.latitude, item.longitude)
  })
  list.sort((a, b) => {
    return a.angle - b.angle
  })

  function radians_to_degrees(radians)
  {
    var pi = Math.PI;
    return radians * (180/pi);
  }
  return list
}
// 此处调用完 list就是有顺序的点，可以连接polygon
dealList(list)
