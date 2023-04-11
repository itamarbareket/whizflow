with import (fetchTarball https://github.com/NixOS/nixpkgs/archive/22.11.tar.gz) { };

stdenv.mkDerivation {
  name = "whizflow";

  buildInputs = with pkgs; [
    git
    nodejs
    yarn
  ];
}
