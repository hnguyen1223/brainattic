import { NgModule } from '@angular/core';
import {
  IconTrash2,
  IconClipboard,
  IconExternalLink,
  IconEdit2,
  IconHash,
  IconLink2,
  IconSearch,
  IconStar,
  IconTag,
  IconCheckSquare,
  IconCheck
} from 'angular-feather';

const icons = [
  IconTrash2,
  IconClipboard,
  IconExternalLink,
  IconEdit2,
  IconHash,
  IconLink2,
  IconSearch,
  IconStar,
  IconTag,
  IconCheckSquare,
  IconCheck
];

@NgModule({
  exports: icons
})
export class IconsModule {}
