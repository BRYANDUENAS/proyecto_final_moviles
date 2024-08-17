import React, { useState } from 'react';
import { FlatList, StatusBar, Text, View } from 'react-native';
import { PRIMARY_COLOR, SECUNDARY_COLOR } from '../../commons/constantsColor';
import { TitleComponent } from '../../components/TitleComponent';
import { BodyComponent } from '../../components/BodyComponent';
import { CardProduct } from './components/CardProduct';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../theme/appTheme';
import { ModalCar } from './components/ModalCar';

//interface - arreglo productos
export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    pathImage: string;
}

//interface - arreglo carrito de compras
export interface Car {
    id: number;
    name: string;
    price: number;
    totalQuantity: number;
}

export const HomeScreen = () => {
    //arreglo con la lista de productos
    const products: Product[] = [
        { id: 1, name: 'Computador', price: 780, stock: 5, pathImage: 'https://todotintasysuministros.com/assets/media/blog/todo-tintas-2.jpg' },
        { id: 2, name: 'Teclado', price: 10, stock: 7, pathImage: 'https://http2.mlstatic.com/D_NQ_NP_2X_808723-MLA74780663109_022024-F.webp' },
        { id: 3, name: 'Adaptador usb', price: 20, stock: 0, pathImage: 'https://http2.mlstatic.com/D_NQ_NP_2X_830467-MLU72035239519_092023-F.webp' },
        { id: 4, name: 'Adapatador', price: 10, stock: 4, pathImage: 'https://http2.mlstatic.com/D_NQ_NP_2X_664981-MEC71008870317_082023-F.webp' },
        { id: 5, name: 'Switch', price: 150, stock: 8, pathImage: 'https://http2.mlstatic.com/D_NQ_NP_2X_647177-MEC72209802211_102023-F.webp' },
        { id: 6, name: 'Camara', price: 60, stock: 8, pathImage: 'https://http2.mlstatic.com/D_NQ_NP_2X_935526-MEC72162844285_102023-F.webp' },
        { id: 7, name: 'Telefono', price: 600, stock: 8, pathImage: 'https://http2.mlstatic.com/D_NQ_NP_2X_813899-MEC75530995253_042024-F.webp' },
        { id: 8, name: 'Television', price: 500, stock: 8, pathImage: 'https://http2.mlstatic.com/D_NQ_NP_2X_915609-MEC76071226900_052024-F.webp' },
    ];

    //hook useState: manipular el arreglo de productos
    const [productsState, setProductsState] = useState(products);

    //hook useState: manipular el arreglo de carrito de compras
    const [car, setCar] = useState<Car[]>([]);

    //hook useState: manipular la visibilidad del modal
    const [showModal, setShowModal] = useState<boolean>(false);

    //función para actualizar la información del arreglo producto
    const changeStockProduct = (idProduct: number, quantity: number) => {
        //Nuevo arreglo con el stock actualizado
        const updateStock = productsState.map(product => product.id === idProduct
            ? { ...product, stock: product.stock - quantity }
            : product);
        //Actualizar productState
        setProductsState(updateStock);

        //llamar función agregar carrito
        addProduct(idProduct, quantity);
    }

    //función agregar los productos al carrito
    const addProduct = (idProduct: number, quantity: number) => {
        const product = productsState.find(product => product.id === idProduct);

        //Controlar si el producto no ha sido encontrado
        if (!product) {
            return;
        }

        //Si el producto fue encontrado - genero objeto car|producto
        const newProductCar: Car = {
            id: product.id,
            name: product.name,
            price: product.price,
            totalQuantity: quantity
        }

        //Agregar en el arreglo del carrito de compras
        setCar([...car, newProductCar]);
        //console.log(car);
    }

    return (
        <View>
            <StatusBar backgroundColor={PRIMARY_COLOR} />
            <View style={styles.contentHeaderHome}>
                <TitleComponent title='Productos' />
                <View style={{
                    ...styles.iconCard,
                    paddingHorizontal: 33
                }}>
                    <Text style={styles.textIconCar}>{car.length}</Text>
                    <Icon
                        name='shopping-cart'
                        size={33}
                        color={SECUNDARY_COLOR}
                        onPress={() => setShowModal(!showModal)} />
                </View>
            </View>
            <BodyComponent>
                <FlatList
                    data={productsState}
                    renderItem={({ item }) => <CardProduct product={item} changeStockProduct={changeStockProduct} />}
                    keyExtractor={item => item.id.toString()} />
            </BodyComponent>
            <ModalCar
                isVisible={showModal}
                car={car}
                setShowModal={() => setShowModal(!showModal)} />
        </View>
    )
}
