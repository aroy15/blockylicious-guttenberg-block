import { 
	useBlockProps
} from '@wordpress/block-editor';

export default function Edit() {
	const blockProps = useBlockProps();
	return <div {...blockProps}>Clicky Button Edit</div>
}