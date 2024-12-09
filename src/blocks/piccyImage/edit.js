import {
	useBlockProps,
	MediaUploadCheck,
	MediaUpload
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

import { __ } from '@wordpress/i18n';
import metadata from './block.json';

import './editor.scss';

export default function Edit(props) {
	const blockProps = useBlockProps();
	const image = useSelect((select) => {
		const data = select("core").getEntityRecord("postType", "attachment", props.attributes.imageId);
		return data;
	}, [props.attributes.imageId]); //second argument is a dependancy array


	return (
		<div {...blockProps}>
			{
				!!props.attributes.imageId && <img style={{height:150, width:"100%", objectFit: "cover"}} src={image?.source_url}/>
			}
			<MediaUploadCheck>
				<MediaUpload
					allowedTypes={["image"]}
					render={({open}) => {
						return (
							<button onClick={open}>
								{__("Select an image", metadata.textdomain)}
							</button>
						)
					}}
					value={props.attributes.imageId}
					onSelect={(item) => {
						props.setAttributes({
							imageId: item.id
						})
					}}
				/>
			</MediaUploadCheck>
		</div>
	)
}