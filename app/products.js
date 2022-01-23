import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const app = createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      api_Path: 'ymiee',
      products: [],
      itemTemp: {},
    }
  },
  methods: {
    // 確認是否登入
    checkLogin() {      
      axios.post(`${this.url}/api/user/check`)
      .then((res) => {
        // 取得產品資料
        this.getProductsData();
      })
      .catch((err) => {
        // 顯示錯誤訊息
        alert(err.data.message);
        // coolkie 不存在轉回登入頁面
        window.location = 'login.html';
      })
    },
    // 取得產品資料
    getProductsData() {
      axios.get(`${this.url}/api/${this.api_Path}/admin/products`)
      .then((res) => {
        const { products } = res.data;
        this.products = products;
      })
      .catch((err) => {
        alert(err.data.message);
        console.log(err);
      })
    },
    // 顯示產品資料
    showProduct(item) {
      this.itemTemp = item;
    },
  },
  created() {
    // 取得 Token ( token 僅須設定一次)
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    
    // 預設將 token 自動加入至 headers
    axios.defaults.headers.common['Authorization'] = token;

    // 確認登入
    this.checkLogin();
  },  
});

app.mount('#app');