import { useEffect, useState } from "react";
import "./App.css";
import "./codicon.css";
export class Configuration {
    constructor(
        public openaiKey?: string,
        public minimaxKey?: string,
        public minimaxGroupId?: string
    ) { }
}

function App() {
    const [errors, setErrors] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState("");
    const [variableBinding, setVariableBinding] = useState<Map<string, string>>(
        new Map<string, string>()
    );
    const [configuration, setConfiguration] = useState<Configuration | {}>({});

    const messageListener = (event: MessageEvent<any>) => {
        const message = event.data;

        console.log("Received event:", message);
        if (message.type == "update") {
            const text = message.text;
            try {

                setErrors([]);
            } catch (error) {
                console.error(error);
                setErrors([`${error}`]);
            }
        } else if (message.type == "configuration") {
            const text = message.text;
            try {
                const config = JSON.parse(text);
                setConfiguration(config);
            } catch (error) {

            }
        }
    };

    useEffect(() => {
        window.addEventListener("message", messageListener);
        return () => {
            window.removeEventListener("message", messageListener);
        };
    }, []);

    return (
        <main className="flex flex-row justify-space-between">
            Hello world
        </main>
    );
}

export default App;
