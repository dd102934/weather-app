export function getLocationData(place) {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    place +
    `.json?access_token=${process.env.MAP_BOX_API_KEY}&limit=1`

  this.$axios
    .get(url)
    .then((response) => {
      console.log(response)
      const geoLocationdata = response.data
      this.latitude = geoLocationdata.features[0].center[1]
      this.longitude = geoLocationdata.features[0].center[0]
      this.location = geoLocationdata.features[0].place_name
    })
    .catch((error) => {
      console.log(error)
  })
}
