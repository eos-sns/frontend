import React from 'react';

class NumbersLabel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { label, number } = this.props;

        return (
            <div>
                <strong>{label}: </strong>{number}
            </div>
        );
    }
}

export { NumbersLabel };
