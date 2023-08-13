import { MOCK_DATA } from "../Data/MOCK_DATA"


export const pedirDatos = () => {
    return new Promise((resolve, reject) => {
        // cuerpo de la promesa
        setTimeout(() => {

            resolve(MOCK_DATA)

        }, 600)
    })
}