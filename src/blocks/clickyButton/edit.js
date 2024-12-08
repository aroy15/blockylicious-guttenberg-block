import { 
	useBlockProps,
	RichText
} from '@wordpress/block-editor';

export default function Edit(props) {
	const blockProps = useBlockProps();
	return <div {...blockProps}>
		<RichText 
			placeholder="Label text" value={props.attributes.labelText}
			onChange={newValue => props.setAttributes({
				labelText: newValue
			})}
		/>
	</div>
}