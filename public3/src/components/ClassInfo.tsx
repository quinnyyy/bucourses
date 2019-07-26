import * as React from "react";

type ClassInfoProps = { code: string; };
type ClassInfoState = { classInfo: any; isLoading: boolean}; // We should define a type for classInfo later

export class ClassInfo extends React.Component<ClassInfoProps, ClassInfoState> {
    constructor(props: ClassInfoProps) {
        super(props);
        this.state = {
            classInfo: null,
            isLoading: true
        }
    }

    componentDidMount() {
        const fetchString: string = 'http://localhost:3000/class?code=' + this.props.code;
        fetch(fetchString)
            .then(res => res.json())
            .then(result => this.setState({classInfo: result, isLoading: false}))
            .catch(error => console.log(error))
    }
    
    render() {
        if (this.state.isLoading) {
            return (
                <div>
                    Loading... {/*Placeholder loading message*/}
                </div>
            )
        } else {
            return (
                <div>
                    Code: {this.state.classInfo.Code}
                    <br/>
                    Credits: {this.state.classInfo.Credits}
                    <br/>
                    Description: {this.state.classInfo.Description}
                    <br/>
                </div>
            )
        }
    }
}