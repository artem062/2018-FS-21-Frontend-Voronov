import FormInput from './formInput';
import './index.css'

class ShareGeo extends FormInput {
    constructor(props) {
        super(props);
        this.takeGeo = this.takeGeo.bind(this);
    }

    takeGeo() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                value: `${position.coords.latitude}, ${position.coords.longitude}`
            }, () => {
                this.state.saveFun(this.state.value);
            });
        });
    }

    handleClick(event) {
        this.takeGeo();
    }

    handleChange(event) {
        this.takeGeo();
    }
}

export default ShareGeo;