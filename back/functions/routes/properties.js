const router = require('express').Router()
const db = require("../services/firebase").admin.firestore();

//* buscar todos los espacios por filtros
router.get("/spaces", (req, res, next) => {
  const condicion = req.query

  db.collection("properties").get()
    .then((data) => {
      const arr = data.docs.map(lugar => {
        const propiedad = lugar.data()
        propiedad.id = lugar.id
        return {
          ...propiedad
        }
      })

      const filtrado = arr.filter(propiedad => {
        return ((condicion.z && propiedad.neighborhood == condicion.z)
          && (condicion.c && propiedad.province == condicion.c)
          && (condicion.t && propiedad.type == condicion.t)
          && (condicion.v && propiedad.verified == condicion.v))
      })

      res
        .status(200)
        .json(filtrado)
    })
    .catch(next)
})

//* buscar todos los espacios 
router.get("/allSpaces", (req, res, next) => {
  db.collection("properties").get()
    .then((data) => {
      res
        .status(200)
        .json(data.docs.map(propiedad => {
          const data = propiedad.data()
          return {
            ...data,
            id: propiedad.id
          }
        }))
    })
    .catch(next)
})

//* buscar todos los espacios de un usuario
router.get("/userSpaces/:id", (req, res, next) => {
  const id = req.params.id
  db.collection("properties").where('userId', '==', id).get()
    .then((data) => {
      const arr = data.docs.map(userProperties => {
        const data = userProperties.data()
        data.id = userProperties.id

        return {
          ...data
        }
      })

      res
        .status(200)
        .json(arr)
    })
})

//* buscar un solo espacio
router.get("/singleSpace/:id", (req, res, next) => {
  const id = req.params.id
  db.collection("properties").doc(id).get()
    .then((data) => {
      res.status(200)
        .json(data.data())
    })
    .catch(next)
})

//* crear un espacio
router.post("/createSpace", (req, res, next) => {
  const body = req.body
  db.collection("properties").add(body)
    .then((data) => {
      res
        .status(201)
        .json(data.id)
    })
    .catch(next)
})


//* eliminar un espacio 
router.delete("/deleteSpace/:id", (req, res, next) => {
  const id = req.params.id
  db.collection("properties").doc(id).delete()
    .then(() => {
      res.sendStatus(200)
    })
    .catch(next)
})


//* updatear un espacio 
router.put('/update/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body
  db.collection('properties').doc(id).update({ photos: body.photos })
    .then(data => {
      res.sendStatus(201)
    })
    .catch(next)
})


module.exports = router