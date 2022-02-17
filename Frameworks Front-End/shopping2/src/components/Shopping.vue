<template>
    <div>
        <h1>{{msg }}</h1>
        <p>Quantidade: {{ productscount }}</p>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td> {{ product.id }}</td>
                    <td> {{ product.name }}</td>
                    <td class='center'>
                        <button @click="product.quant--">-</button>
                        <input class="cell-center" min="0" type="number" v-model="product.quant"/>
                        <button @click="product.quant++" >+</button>
                    </td>
                    <td>{{ total(product) }}</td>
                </tr>
            </tbody>
        </table>
        <p>Total: {{ productsTotal }}</p>
    </div>
</template>

<script>
export default {
    name: 'Shopping',
    props:{
        msg: String
    },
    data(){
        return {
            products: [
                { id:1, name: 'Sapato', quant: 5, price: 189.98},
                { id:1, name: 'Bolsa', quant: 5, price: 155.98},
                { id:1, name: 'Cinto', quant: 5, price: 65.98},
                { id:1, name: 'chapeu', quant: 5, price: 92.99},
                { id:1, name: 'Blusa', quant: 5, price: 89.98},
            ]
        }
    },
    methods: {
        total(product){
            return (product.price * product.quant).toFixed(2)
        }
    },
    computed:{
        productsCount(){
            return this.products
            .map(product => product.quant)
            .reduce((pv,cv) => pv += cv)
        },
        productsTotal(){
            return this.products
            .map(product => product.quant * product.price)
            .reduce((pv,cv) => pv += cv)
            .toFixed(2)
        }
    },
}
</script>

<style scoped>
.center{
    text-align: center;
}
.cell-center{
    max-width: 30px;
    display: inline-block;
}
h3{
    margin: 40px 0 0;
}
th, td{
    border-top: 1px solid lightgrey;
    padding: 5px 10px;
}
a {
    color: blueviolet;
}
</style>