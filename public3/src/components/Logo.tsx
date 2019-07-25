class UsersComponent extends React.Component {
    constructor() {
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        fetch(`/api/users`)
            .then(res => res.json())
            .then(result => this.setState({ users: result.users }))
    }
    render() {
        return (
            <div>
                Users: {this.state.users}            
            </div>
        )
    }
}