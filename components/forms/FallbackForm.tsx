

export default function FallbackForm({formType}: {formType:string}): React.JSX.Element {
    
    return (
        <>
            <h3 className={`font-bold text-xl p-5 ${formType==="add"?"bg-lime-600/90":"bg-red-600"} rounded-t-md text-white`}>...</h3>
            <div className='size-100'></div>
        </>
    );
};