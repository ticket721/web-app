import * as React from 'react';
import Lottie     from 'react-lottie';
import BarLoader  from './animations/bar_loader.json';

interface IFullPageLoaderProps {
}

interface IFullPageLoaderState {
}

const options = {
    loop: true,
    autoplay: true,
    animationData: BarLoader,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

export class FullPageLoader extends React.Component<IFullPageLoaderProps, IFullPageLoaderState> {

    constructor(props: IFullPageLoaderProps) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <div>

                <Lottie
                    options={options}
                    width={400}
                    height={400}
                />

            </div>
        );
    }

}
