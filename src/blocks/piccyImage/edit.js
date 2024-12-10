import {
	useBlockProps,
	MediaUploadCheck,
	MediaUpload
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';
// import { Icon } from '@wordpress/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPanorama } from '@fortawesome/free-solid-svg-icons';

/*==These three line code fixing the huge icon size issue ==*/
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
/*===X=====X=== */
import { ImageThumbnail } from '../../components/ImageThumbnail';
import { useImage } from '../../hooks/useImage';


import './editor.scss';

export default function Edit(props) {
	const blockProps = useBlockProps();
	const image = useImage(props.attributes.imageId);

	const imageSelected = !!props.attributes.imageId && !!image?.source_url;


	return (
		<div {...blockProps}>
			{
				!!imageSelected && <ImageThumbnail imageId={props.attributes.imageId}/>
			}
			{
				!imageSelected && (
					<div style={{display:"flex", height:150, width:"100%", background: "#ffffff"}}>
						{/* <Icon icon="format-image" style={{margin: "auto"}}/> */}
						<FontAwesomeIcon icon={faPanorama} style={{margin: "auto"}}/>
					</div>
				)
				
			}
			<MediaUploadCheck>
				<MediaUpload
					allowedTypes={["image"]}
					render={({open}) => {
						return (
							<button className='media-select' onClick={open}>
								{!!imageSelected ? __("Replace the image", metadata.textdomain) : 
								__("Select an image", metadata.textdomain)}
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