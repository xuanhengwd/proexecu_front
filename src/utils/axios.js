import axios from 'axios'
// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
axios.defaults.baseURL = "http://localhost:8080"
export default axios