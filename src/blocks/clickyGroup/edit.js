import { 
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps
} from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: [["blockylicious/clicky-button", {}]],
		allowedBlocks: ["blockylicious/clicky-button"]
	});
	return (
		<>
			<div {...innerBlocksProps} />

			{/* <div {...blockProps}>
				<InnerBlocks
					template={[["blockylicious/clicky-button", {}]]}
					allowedBlocks={["blockylicious/clicky-button"]}
				/>
			</div> */}
		</>
	)
}