import * as React from "react";

type ClassSearchState = { code: string; };

export class ClassSearch extends React.Component<{}, ClassSearchState> {
    constructor(props: any) {
        super(props);
        this.state = {
            code: ''
        };

    }
    private handleSubmit = (): void => {
        alert(this.state.code);
    }

    private handleChange = (event: any): void => {
        this.setState({ code: event.target.value });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    Class Code: <input type="text" value={this.state.code} onChange={this.handleChange}></input>
                    <input type="submit" value="Search" />
                </form>
            </div>
        )
    }
}