import {
	useBlockProps,
	MediaUploadCheck,
	MediaUpload
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';
import metadata from './block.json';

import './editor.scss';

export default function Edit(props) {
	const blockProps = useBlockProps();
	return (
		<div {...blockProps}>
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
				/>
			</MediaUploadCheck>
		</div>
	)
}