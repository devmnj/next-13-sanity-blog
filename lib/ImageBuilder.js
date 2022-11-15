import client from './sanity'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client);
 
export function urlFor(src){
    return builder.image(src)
}