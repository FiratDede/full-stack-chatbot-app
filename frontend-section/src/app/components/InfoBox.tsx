import { Spinner } from "react-activity";
import { twMerge } from 'tailwind-merge'

type InfoBoxProps = {
    isLoading: boolean;  
    message: string; 
    errorMessage: string;
    messageTextClass: string;
    errorMessageTextClass: string;
  };

const InfoBox: React.FC<InfoBoxProps> = ({ isLoading, message, errorMessage, messageTextClass = "", errorMessageTextClass = "" }) => {
    return (
        (isLoading) ? <div className= "flex flex-col bg-amber-500 p-1 justify-center items-center rounded min-h-20 	" >
        <div className="text-white text-md mb-1" > Loading </div>
            < Spinner color = "white" size = { 20} />
                </div>
                : (message) ?
        <div className="flex flex-col bg-amber-500 p-1 justify-center items-center rounded min-h-20" >
            <div className={ twMerge("text-white text-center text-md mb-1", messageTextClass) }> { message } </div>
                </div>
                    : (errorMessage) ?
        <div className="flex flex-col bg-red-500 p-1 justify-center items-center rounded min-h-20  " >
            <div className={ twMerge("text-white text-center text-md mb-1", errorMessageTextClass) }> { errorMessage } </div>
                </div>
                        : <span></span>
            
    )

}
export default InfoBox;