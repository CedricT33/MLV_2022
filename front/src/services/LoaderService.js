import Loader from "react-js-loader";

export default class LoaderService {

    show() {
        const elmtLoader = document.querySelector(".loader");
        elmtLoader.classList.add('show');
    }

    hide() {
        const elmtLoader = document.querySelector(".loader");        
        elmtLoader.classList.remove('show');
    }
}

export const loader = new LoaderService();


export function Loading() {

    return (
        <div className="loader"><Loader type="bubble-loop" bgColor={"#680da9"} size={100} /></div>
    );
}