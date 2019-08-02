import * as React from "react";
import { Checkbox } from './Checkbox';

interface checkedMap {[key: string] : boolean};
type DropdownProps = { options: Array<string> };
type DropdownState = { showing: boolean; checkedOptions: checkedMap};

export class Dropdown extends React.Component<DropdownProps,DropdownState> {
    constructor(props: DropdownProps) {
        super(props);

        let checkedOptions : checkedMap = this.props.options.reduce((a, key) => Object.assign(a, {[key]: false}), {});

        this.state = {
            showing : false,
            checkedOptions : checkedOptions
        }
    }

    private setCheckedOption = (option : string, checked : boolean) : void => {
        let updatedCheckedOptions : checkedMap = Object.assign({}, this.state.checkedOptions, {[option]: checked});
        this.setState({checkedOptions : updatedCheckedOptions});
    }

        render() {
            return (
                <div className="btn-group">
                    <button type="button" className="btn btn-primary dropdown-toggle" 
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Action
                    </button>
                    <div className="dropdown-menu" x-placement="bottom-start" style={{position: "absolute", transform: "translate3d(0px, 38px, 0px)", top: "0px", left: "0px", willChange: "transform"}}>
                    <form>
                    <ul>
                        {
                            this.props.options.map( (option, i) => {
                                return (
                                    <li key={i} style={{listStyle: "none"}}>
                                        <Checkbox isDropdown={true} option={option} propogateState={this.setCheckedOption}/>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    </form>
                    </div>
                </div>

            )
        }
}