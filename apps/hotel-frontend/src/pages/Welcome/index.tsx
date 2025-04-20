import { useModel } from "@umijs/max";
import { Button } from "antd";

const Help: React.FC<any> = ()=>{
const { initialState, setInitialState } = useModel('@@initialState');
        return <div>
              Welcome to reservation ui
        </div>
}



export default Help