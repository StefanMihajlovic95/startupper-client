import React, {ReactNode} from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';

type Props = {
    children: ReactNode;
};

export default function App(props: Props) {
    const {children} = props;
    return <>{children}</>;
}
