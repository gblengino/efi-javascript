import { Fieldset } from 'primereact/fieldset';

export default function Comment({ author, date, content}){
    return (
        <Fieldset legend={`${author} - ${date}`} className='comment'>
            <p>{content}</p>
        </Fieldset>
    )
}