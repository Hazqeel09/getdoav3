build-local:
	@echo "Building local"
	@docker build -t getdoa --platform=linux/arm64 --progress=plain --no-cache remix/

.PHONY: build-local
