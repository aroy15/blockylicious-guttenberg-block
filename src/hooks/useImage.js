import { useSelect } from '@wordpress/data';

export const useImage = (imageId) =>{
	const image = useSelect((select) => {
		const data = select("core").getEntityRecord("postType", "attachment", imageId);
		return data;
	}, [imageId]); //second argument is a dependancy array

	return image;
}