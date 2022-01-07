# AOB-POS-BACKEND

POS backend in go, below are the steps to get started

  - Download GO from golang.org and install binary for your OS
  - Install IDE - GoLand as free trial
  - Install Protobuf Compiler for go-micro which will be used to generate code for client implementation
  - Install Consul 
  - Set relevant environment variables for development on Local Machine

### Protoc setup!

install protoc-gen-micro

  - ``` $ go get github.com/micro/protobuf/{proto,protoc-gen-go}```
  - ```$ go get github.com/micro/protoc-gen-micro ```
  - Also need to download and install protoc (Protobuf Compiler), get it from https://github.com/protocolbuffers/protobuf/releases
  - Put the protoc binary in ```$HOME/bin``` and included *types* from google in the ```include``` folder, which should automatically be in ```$PATH```
  - Also add to path  - ```GOPATH``` and ```GOBIN``` variables
 

### Consul Setup

Download consul (for service discovery) from consul.io --> download binary and put in ```$HOME/bin``` just like *protoc* binary.
Run consul with ```consul agent --dev```

### Environment Variables

```export MICRO_ENV="local"```

```export MICRO_REGISTRY="consul"```

### GoLang usage

get all external dependencies of the project
```sh
$ go get ./...
```

Generate client code with Protoc
```sh
$ protoc -I aob-pos-backend/proto --go_out=plugins=micro:. aob-pos-backend/proto/<>.proto
```

### Project Directory Setup
    .
    ├── $HOME
    |    ├── go                     # Go Directory (GOPATH)
    |        ├── src                # src folder containing projects
    |           ├── aob-pos-backend # project folder
    |           ├── github.com      # dependencies folder(s)
    |           ├── bloom-konnect   # Other projects
    |        ├── bin                # bin folder containing binaries (GOBIN)
    |        ├── pkg                # go library code
    └── ...


  
