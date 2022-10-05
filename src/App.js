import './App.css';
import {useState} from "react";
import axios from "axios";


const App = () => {
    const [file, setFile] = useState();
    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        setMessage("");
        setFile(event.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = new FormData();

        if (file !== undefined) {
            data.append('file', file, file.name);
            const config = {
                url: 'https://pe-app.tech/file-upload/',
                data: data,
                method: "post"
            };

            axios(config).then((response) => {
                setMessage(JSON.stringify(response.data, null, "\t"))
                console.log(response.data);
            });
        }else {
            setMessage("Please select a file")
        }
    }

    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group files color">
                                <h1>Upload file</h1>
                                <input type="file" className="form-control" name="file" onChange={handleChange}/>
                                <button className={"button-3"} type={"submit"}>Upload</button>
                            </div>
                        </form>

                        <div className={"json"}>
                            <pre>{message}</pre>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
