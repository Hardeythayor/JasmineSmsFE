import "./Loader.css"
import { ClipLoader } from 'react-spinners'

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#3b82f6",
};

export default function Loader() {
    return (
        <div className='loader-wrapper'>
            <ClipLoader
                color={'#ffffff'}
                loading={true}
                // cssOverride={override}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}