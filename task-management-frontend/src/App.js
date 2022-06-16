import {Route, Routes} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import TasksPage from "./pages/TasksPage";

const {Component} = require("react");

class App extends Component {
    render() {
        return(
            <Routes>
                <Route path="/" element={<SignInPage/>} />
                <Route path="/signin" element={<SignInPage/>} />
                <Route path="/signup" element={<SignUpPage/>} />
                <Route path="/tasks" element={<TasksPage/>} />
                <Route path="/tasks/create" element={<CreateTaskPage/>} />
            </Routes>
        );
    }
}

export default App;
