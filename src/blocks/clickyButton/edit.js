import { 
	useBlockProps,
	RichText
} from '@wordpress/block-editor';

export default function Edit(props) {
	const blockProps = useBlockProps();
	return <div {...blockProps}>
		<RichText 
			placeholder="Label text" 
			value={props.attributes.labelText}
			allowedFormats={[]} //disabled default text formatting
			multiline={false}
			onSplit={() => {}}
			onReplace={() => {}}
			onChange={newValue => props.setAttributes({
				labelText: newValue
			})}
		/>
	</div>
}