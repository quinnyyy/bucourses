import * as React from "react";
import { SingleClass } from "../types/SingleClassType";
import * as Styles from "../styles/SingleClassStyles";

type SingleClassDisplayProps = { classInfo : SingleClass};

export class SingleClassDisplay extends React.Component<SingleClassDisplayProps, {}> {
    constructor(props: SingleClassDisplayProps) {
        super(props);
    }

    render() {
        let newCode : string = this.props.classInfo.Code.replace(/-/g, " ").toUpperCase();

        return (
            <div style={Styles.SingleClassContainer}>
                <h4 style={Styles.ClassName}>{this.props.classInfo.ClassName}</h4>
                <h5 style={Styles.Code}>{newCode}</h5>
                <h5 style={Styles.College}>{this.props.classInfo.College}</h5>
                <h5 style={Styles.Credits}>{this.props.classInfo.Credits} Credits</h5>
                <h6 style={Styles.Description}>{this.props.classInfo.Description}</h6>
            </div>
        )
    }
}