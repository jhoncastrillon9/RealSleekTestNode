import express from 'express'
import './loaders/mongoose'
import config from './config/'
import userRoutes from './api/routes/user.routes'
import productRoutes from './api/routes/product.routes'
import morgan from 'morgan' 
import cors from 'cors' 
import authRoutes from './api/routes/auth.routes'
import { CreateRoles } from './loaders/initSetup'

const app = express();

app.listen(config.PORT,() => {
    console.log('Hello World PORT:3000');    
})

/**Si importa el orden primero debe estar ubicado morgan Para ver las cosnultas que llegan al server*/
app.use(morgan('dev'))

/**Indicar que servidor se puede conectar POR AHORA TODO EN PROD debe ser solamente el server del fronted */
app.use(cors());

/**Pueda entender las peticiones post con json */
app.use(express.json());

/**Pueda entender las url con parametros */
app.use(express.urlencoded({ extended: false }));

/**Rutas */
app.use('/api/auth',authRoutes);
app.use('/api/product',productRoutes);

//Se crear roles predefinidos
CreateRoles();

export default app;