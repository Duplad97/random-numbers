import { Alert, Button, FormGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import bg1 from "./assets/bg1.jpg";
import bg2 from "./assets/bg2.jpg";
import bg3 from "./assets/bg3.jpg";
import bg4 from "./assets/bg4.jpg";
import bg5 from "./assets/bg5.jpg";

const randomIntFromInterval = (min: number, max: number) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function App() {
    const [min, setMin] = useState<number>(0);
    const [max, setMax] = useState<number>(0);
    const [generatedNumber, setGeneratedNumber] = useState<number|null>(null);
    const [error, setError] = useState<string>("");
    const [background, setBackground] = useState<string>("");

    useEffect(() => {
        getRandomBackground();
    }, []);

    const getRandomBackground = () => {
        const backgrounds = [bg1, bg2, bg3, bg4, bg5];
        const index = randomIntFromInterval(0, backgrounds.length - 1);
        setBackground(backgrounds[index]);
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        const randomNumber = randomIntFromInterval(min, max);
        if (min <= max) {
            setError("");
            setGeneratedNumber(randomNumber);
        } else {
            setError("A minimum értéknek kisebbnek kell lennie a maximumnál!");
        }
    }

    return (
        <div className="App p-5" style={{backgroundImage: `url(${background})`}}>
            <form className="text-center" onSubmit={handleSubmit}>
                <FormGroup>
                    <TextField className="input" type="number" value={min} onChange={(e) => setMin(parseInt(e.target.value))} label="Min" />
                    <TextField className="input mt-3" type="number" value={max} onChange={(e) => setMax(parseInt(e.target.value))} label="Max" />
                </FormGroup>
                <Button className="mt-5" variant="contained" type="submit">Generálás</Button>
            </form>

            {error && 
                <Alert className="mt-3" severity="warning">{error}</Alert>
            }

            {(generatedNumber !== null && generatedNumber >= 0) && 
                <div className="generated-number-container mt-5 text-center">
                    <h1>{generatedNumber}</h1>
                </div>
            }
        </div>
    );
}

export default App;
