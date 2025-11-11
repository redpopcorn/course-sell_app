
import React from "react";

function Buy(){
    const {courseId} = useParams();
    const[loading,setLoading]=useState(false)
    return (<div className ="flex h-screen items-center justify-center">
        <button onclick ={}>{loading?"Processing...":"Buy Now"}</button>
    </div>
    );
}
export default Buy;