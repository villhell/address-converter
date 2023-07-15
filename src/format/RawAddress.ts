/*
 * Copyright 2019 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Base32 } from './Base32';
import { Convert } from './Convert';

export class RawAddress {
  static readonly constants = {
    sizes: {
      ripemd160: 20,
      addressDecoded: 24,
      addressEncoded: 39,
      key: 32,
      checksum: 3,
    },
  };
  /**
   * Converts an encoded address string to a decoded address.
   * @param {string} encoded The encoded address string.
   * @returns {Uint8Array} The decoded address corresponding to the input.
   */
  public static stringToAddress = (encoded: string): Uint8Array => {
    if (RawAddress.constants.sizes.addressEncoded !== encoded.length) {
      throw Error(`${encoded} does not represent a valid encoded address`);
    }
    return Base32.Base32Decode(`${encoded}A`).subarray(
      0,
      RawAddress.constants.sizes.addressDecoded
    );
  };

  /**
   * Converts a decoded address to an encoded address string.
   * @param {Uint8Array} decoded The decoded address.
   * @returns {string} The encoded address string corresponding to the input.
   */
  public static addressToString = (decoded: Uint8Array): string => {
    if (RawAddress.constants.sizes.addressDecoded !== decoded.length) {
      throw Error(
        `${Convert.uint8ToHex(
          decoded
        )} does not represent a valid decoded address`
      );
    }
    const padded = new Uint8Array(
      RawAddress.constants.sizes.addressDecoded + 1
    );
    padded.set(decoded);
    return Base32.Base32Encode(padded).slice(0, -1);
  };
}
